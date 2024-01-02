interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps): JSX.Element => {
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

export default Total;
