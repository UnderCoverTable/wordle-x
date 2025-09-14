// pages/index.tsx
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/game", // 👈 Change this
      permanent: false,
    },
  };
}

export default function Index() {
  return null;
}