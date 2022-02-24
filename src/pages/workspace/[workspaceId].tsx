import { GetServerSideProps, NextPage } from "next";

const Workspace: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = ({ params }) => {
  console.log(params);

  return {
    props: {},
  };
};

export default Workspace;
