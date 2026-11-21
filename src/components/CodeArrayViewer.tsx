import {useMemo, useState} from 'react';
import {Check, Copy, ChevronDown, ChevronRight} from 'lucide-react';
import {motion} from 'motion/react';

export interface CodeObjectItem {
  id: string;
}

interface CodeArrayViewerProps<T extends CodeObjectItem> {
  variableName: string;
  typeName: string;
  fileName: string;
  items: T[];
  selectedId?: string | null;
  onSelectItem?: (item: T) => void;
}

function stripInternalFields(item: CodeObjectItem): Record<string, unknown> {
  const record = item as unknown as Record<string, unknown>;
  const {image: _img, liveUrl: _live, repoUrl: _repo, featured: _feat, ...publicFields} = record;
  return publicFields;
}

function renderValueLines(value: unknown, indentLevel: number): string[] {
  const indent = '  '.repeat(indentLevel);

  if (typeof value === 'string') {
    return [`'${value.replace(/'/g, "\\'")}'`];
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return [String(value)];
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return ['[]'];
    }
    const allPrimitive = value.every(
      (v) => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
    );
    const serializedInline = `[${value
      .map((v) => (typeof v === 'string' ? `'${v}'` : String(v)))
      .join(', ')}]`;
    if (allPrimitive && serializedInline.length <= 68) {
      return [serializedInline];
    }
    const lines: string[] = ['['];
    value.forEach((v, idx) => {
      const valLines = renderValueLines(v, indentLevel + 1);
      const comma = idx < value.length - 1 ? ',' : '';
      lines.push(`${indent}  ${valLines[0]}${valLines.length === 1 ? comma : ''}`);
      for (let i = 1; i < valLines.length; i++) {
        lines.push(`${valLines[i]}${i === valLines.length - 1 ? comma : ''}`);
      }
    });
    lines.push(`${indent}]`);
    return lines;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) {
      return ['{}'];
    }
    const lines: string[] = ['{'];
    entries.forEach(([k, v], idx) => {
      const valLines = renderValueLines(v, indentLevel + 1);
      const comma = idx < entries.length - 1 ? ',' : '';
      if (valLines.length === 1) {
        lines.push(`${indent}  ${k}: ${valLines[0]}${comma}`);
      } else {
        lines.push(`${indent}  ${k}: ${valLines[0]}`);
        for (let i = 1; i < valLines.length; i++) {
          lines.push(`${valLines[i]}${i === valLines.length - 1 ? comma : ''}`);
        }
      }
    });
    lines.push(`${indent}}`);
    return lines;
  }
  return ['null'];
}

function highlightCodeLine(line: string) {
  const keyMatch = line.match(/^(\s*)([a-zA-Z0-9_]+)(:\s*)(.*)$/);
  if (keyMatch) {
    const [, leading, key, colon, rest] = keyMatch;
    return (
      <>
        <span>{leading}</span>
        <span className="text-[#FF8A47]">{key}</span>
        <span className="text-white/50">{colon}</span>
        <span className="text-white">{rest}</span>
      </>
    );
  }
  if (line.trim().startsWith("'") || line.trim().startsWith('"')) {
    return <span className="text-white/95">{line}</span>;
  }
  return <span className="text-white/65">{line}</span>;
}

export function CodeArrayViewer<T extends CodeObjectItem>({
  variableName,
  typeName,
  fileName,
  items,
  selectedId,
  onSelectItem,
}: CodeArrayViewerProps<T>) {
  const [copied, setCopied] = useState(false);
  const [collapsedIds, setCollapsedIds] = useState<Record<string, boolean>>({});

  const fullSourceCode = useMemo(() => {
    const body = items
      .map((item) => {
        const publicFields = stripInternalFields(item);
        const lines = renderValueLines(publicFields, 1);
        return `  ${lines.join('\n')}`;
      })
      .join(',\n');
    return `export const ${variableName}: ${typeName}[] = [\n${body}\n];`;
  }, [items, typeName, variableName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullSourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => ({...prev, [id]: !prev[id]}));
  };

  let runningLine = 2;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#EA580C]/30 bg-[#0E0B09]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#17120F] px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-[#FF7A2F]">{fileName}</span>
          <span className="text-white/30" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-xs text-white/70 tabular-nums">
            {items.length} {items.length === 1 ? 'object' : 'objects'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/15 bg-[#221A15] px-3 font-mono text-xs font-medium text-white transition-colors duration-150 hover:border-[#FF7A2F] hover:text-[#FF7A2F] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A2F]"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#FF7A2F]" aria-hidden="true" />
              Copied TS
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy Array
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed sm:p-5">
        <div className="flex items-baseline gap-4 px-2 py-0.5">
          <span className="w-6 shrink-0 select-none text-right text-white/35 tabular-nums">1</span>
          <div className="whitespace-pre">
            <span className="text-[#FF7A2F]">export const</span>{' '}
            <span className="font-semibold text-white">{variableName}</span>
            <span className="text-white/55">: </span>
            <span className="text-[#FDBA74]">{typeName}[]</span>{' '}
            <span className="text-white/55">= [</span>
          </div>
        </div>

        {items.map((item, itemIdx) => {
          const isSelected = selectedId === item.id;
          const isCollapsed = Boolean(collapsedIds[item.id]);
          const publicFields = stripInternalFields(item);
          const objectLines = renderValueLines(publicFields, 1);
          const trailingComma = itemIdx < items.length - 1 ? ',' : '';

          const headerLineNumber = runningLine;
          if (isCollapsed) {
            runningLine += 1;
          } else {
            runningLine += objectLines.length;
          }

          const previewLabel =
            (publicFields.role as string) ||
            (publicFields.title as string) ||
            (publicFields.domain as string) ||
            item.id;

          return (
            <motion.div
              key={item.id}
              layout="position"
              onClick={() => onSelectItem?.(item)}
              className={`group my-1 rounded-lg transition-colors duration-150 ${
                onSelectItem ? 'cursor-pointer' : ''
              } ${
                isSelected
                  ? 'bg-[#C2410C]/20 ring-1 ring-[#FF7A2F]/60'
                  : 'hover:bg-white/[0.04]'
              }`}
            >
              {isCollapsed ? (
                <div className="flex items-center gap-4 px-2 py-1">
                  <span className="w-6 shrink-0 select-none text-right text-white/35 tabular-nums">
                    {headerLineNumber}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCollapse(item.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-left text-white/80 hover:text-[#FF7A2F] cursor-pointer"
                    aria-label={`Expand ${previewLabel}`}
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#FF7A2F]" aria-hidden="true" />
                    <span className="text-white/55">{'  {'}</span>
                    <span className="text-[#FF8A47]">id:</span>
                    <span className="text-white">'{item.id}'</span>
                    <span className="text-white/45">... {previewLabel}</span>
                    <span className="text-white/55">{`}${trailingComma}`}</span>
                  </button>
                </div>
              ) : (
                <div className="py-0.5">
                  {objectLines.map((lineText, lineIdx) => {
                    const lineNumber = headerLineNumber + lineIdx;
                    const displayLine =
                      lineIdx === objectLines.length - 1
                        ? `  ${lineText}${trailingComma}`
                        : `  ${lineText}`;
                    return (
                      <div key={lineIdx} className="flex items-baseline gap-4 px-2">
                        <span className="w-6 shrink-0 select-none text-right text-white/35 tabular-nums">
                          {lineNumber}
                        </span>
                        <div className="flex flex-1 items-center justify-between gap-2 whitespace-pre">
                          <div>{highlightCodeLine(displayLine)}</div>
                          {lineIdx === 0 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCollapse(item.id);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] text-white/45 opacity-0 transition-opacity group-hover:opacity-100 hover:text-[#FF7A2F] focus-visible:opacity-100 cursor-pointer"
                              aria-label={`Collapse ${previewLabel}`}
                            >
                              <ChevronDown className="h-3 w-3" aria-hidden="true" />
                              Collapse
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}

        <div className="flex items-baseline gap-4 px-2 py-0.5">
          <span className="w-6 shrink-0 select-none text-right text-white/35 tabular-nums">
            {runningLine}
          </span>
          <span className="text-white/55">];</span>
        </div>
      </div>
    </div>
  );
}
