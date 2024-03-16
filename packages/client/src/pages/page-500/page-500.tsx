type Page500Props = {
  error?: string;
};

export const Page500 = ({ error = 'Что-то пошло не так' }: Page500Props) => {
  return <div>{error}</div>;
};
