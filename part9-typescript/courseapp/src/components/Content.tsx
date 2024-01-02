interface Content {
  id: number;
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: Content[];
}

const Content = ({ content }: ContentProps): JSX.Element => {
  const contentList = content.map((c) => (
    <p key={c.id}>
      {c.name} {c.exerciseCount}
    </p>
  ));
  return <div>{contentList}</div>;
};

export default Content;
