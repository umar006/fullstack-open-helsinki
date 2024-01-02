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

interface CoursePartSpecial extends CoursePartBaseDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface ContentProps {
  contents: CoursePart[];
}

interface PartProps {
  content: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ content }: PartProps): JSX.Element => {
  switch (content.kind) {
    case "basic":
      return (
        <p>
          {content.name} | {content.kind} | {content.exerciseCount} |{" "}
          {content.description}
        </p>
      );
    case "group":
      return (
        <p>
          {content.name} | {content.kind} | {content.exerciseCount} |{" "}
          {content.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {content.name} | {content.kind} | {content.exerciseCount} |{" "}
          {content.description} | {content.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          {content.name} | {content.kind} | {content.exerciseCount} |{" "}
          {content.requirements.join(", ")} | {content.description}
        </p>
      );
    default:
      return assertNever(content);
  }
};

const Content = ({ contents }: ContentProps): JSX.Element => {
  const contentList = contents.map((c) => <Part key={c.id} content={c} />);
  return <div>{contentList}</div>;
};

export default Content;
