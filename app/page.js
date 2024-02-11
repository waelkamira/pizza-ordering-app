import Hero from '../components/layout/Hero';
import HomeMenu from '../components/layout/HomeMenu';
import SectionHeaders from '../components/layout/SectionHeaders';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center mt-16">
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'} />
        <div className=" text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
            consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum
            dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur
            Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
            consectetur
          </p>
          <p>
            Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
            consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum
            dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur
            Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
            consectetur
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"don't hesitate"}
          mainHeader={'Contact Us'}
        />
        <div className="my-8 underline text-gray-500">
          <a href="tel:+45 481 545 445" className="text-4xl">
            +45 481 545 445
          </a>
        </div>
      </section>
    </>
  );
}
