interface CoursePartBase {
  id: number;
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBaseDescription {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;

interface Content {
  id: number;
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: CoursePart[];
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
