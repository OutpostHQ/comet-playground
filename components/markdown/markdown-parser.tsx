"use client"

/* eslint-disable react/no-children-prop */
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export function MarkdownParser(props: { answer: string }) {
  return (
    <ReactMarkdown
      children={String(props?.answer).replace(/\n$/, "")}
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
