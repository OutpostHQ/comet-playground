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
          const match = /language-(\w+)/.exec(className || "")
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              PreTag="div"
              style={{}}
              useInlineStyles
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
