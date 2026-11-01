import PageHero from '@/components/PageHero';
import CBtn from '@/components/CBtn';

export default function NotFound() {
  return (
    <PageHero crumbs={[['Home', '/'], ['404']]} kicker="404" lines={['Page', <>not <span className="acc">found.</span></>]} sub="That route does not exist.">
      <div className="btn-row"><CBtn to="/">Back home</CBtn></div>
    </PageHero>
  );
}
