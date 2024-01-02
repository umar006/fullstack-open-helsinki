interface CoursePartBase {
  id: number;
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  description: string;
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
