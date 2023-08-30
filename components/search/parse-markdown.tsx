/* eslint-disable react/no-children-prop */
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export function MarkdownParser({ answer }: { answer: string }) {
  return (
    <ReactMarkdown
      children={String(answer).replace(/\n$/, "")}
      components={{
        code({ node, inline, className, children, style, ...props }) {
          return !inline ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              PreTag="div"
              style={{}}
              useInlineStyles
              language="javascript"
              {...props}
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        },
      }}
    />
  )
}
