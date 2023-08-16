import { Image1 } from "../assets";
import { NotFound, AuthTemplate, Main, Title } from "../components";

function PageNotFound() {
  return (
    <>
      <Title text={"Tandur | Halaman tidak ditemukan"} />
      <Main head={false}>
        <AuthTemplate image={Image1}>
          <NotFound />
        </AuthTemplate>
      </Main>
    </>
  );
}

export default PageNotFound;
