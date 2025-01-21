import BooleanRadioGroup from "@/components/BooleanRadioGroup";

async function Home() {
  return (
    <>
      <div className="h-[50px]"></div>
      <BooleanRadioGroup label="Should swim?" />
    </>
  );
}

export default Home;
