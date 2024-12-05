import Link from "@/components/MemoContent/Link";
import { BaseProps } from "@/components/MemoContent/types";
import { AutoLinkNode, LinkNode, Node, NodeType, ParagraphNode, TagNode, TextNode } from "@/types/proto/api/v1/markdown_service";

interface TagProps extends BaseProps {
  content: string;
}
interface TextProps extends BaseProps {
  content: string;
}
interface ParagraphProps extends BaseProps {
  children: Node[];
}

const Tag: React.FC<TagProps> = ({ content }: TagProps) => {
  return <span className="text-[#5e668e] text-sm cursor-default">{`#${content}`}</span>;
};

const Text: React.FC<TextProps> = ({ content }: TextProps) => {
  return <span className="text-black text-sm">{content}</span>;
};

const Paragraph: React.FC<ParagraphProps> = ({ children }: ParagraphProps) => {
  return (
    <p>
      {children.map((child, index) => (
        <MomentsRender key={`${child.type}-${index}`} index={index} node={child} />
      ))}
    </p>
  );
};

const MomentsRender = (props: { node: Node; index: number }) => {
  const { node, index } = props;
  switch (node.type) {
    case NodeType.PARAGRAPH:
      return <Paragraph index={String(index)} {...(node.paragraphNode as ParagraphNode)} />;
    case NodeType.TEXT:
      return <Text index={String(index)} {...(node.textNode as TextNode)} />;
    case NodeType.TAG:
      return <Tag index={String(index)} {...(node.tagNode as TagNode)} />;
    case NodeType.LINK:
      return <Link {...(node.linkNode as LinkNode)} />;
    case NodeType.AUTO_LINK:
      return <Link {...(node.autoLinkNode as AutoLinkNode)} />;
    default:
      return null;
  }
};

export default MomentsRender;
