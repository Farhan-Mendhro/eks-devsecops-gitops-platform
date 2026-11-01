import PageHero from '@/components/PageHero';
import Stages from '@/components/Stages';
import Reveal from '@/components/Reveal';
import CBtn from '@/components/CBtn';

export default function Process() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Process']]} kicker="[03] Process" lines={['From brief', <>to <span className="acc">release.</span></>]} sub="Every project runs on the same pipeline you can see: one board, one stage at a time." />
      <section className="paper sec"><div className="wrap"><Stages />
        <Reveal><div className="btn-row top"><CBtn to="/contact" light>Start a project</CBtn></div></Reveal></div></section>
    </>
  );
}
