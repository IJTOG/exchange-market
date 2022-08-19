import type { NextPage } from "next";
import Welcome from "components/Welcome";
// import { wrapper } from "store/store";

const Home: NextPage = () => {
  return (
    <>
      <Welcome />
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(setAuthState(true));
//     return {
//       props: {}
//     };
//   }
// );

export default Home;
