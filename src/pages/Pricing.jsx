// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Simple pricing policy ensures transparency and fairness by making costs easy to understand 
            and predictable for you. It eliminates hidden fees, confusing discounts, and complicated tiers.
          </p>
        </div>
        <img src="img2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
