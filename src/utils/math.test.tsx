import {
  calculateMortgage,
  calculateMortgageInsurance,
  calculatePMI,
} from "./math";

describe("math.tsx", () => {
  it("calculateMortgage returns correct monthly payment", () => {
    // $200,000 principal, 6% annual rate, 30 years
    const payment = calculateMortgage(200000, 6, 30);
    expect(payment).toBeCloseTo(1199.10, 2);
  });

  it("calculateMortgageInsurance returns correct annual cost", () => {
    // $180,000 loan, 0.5% rate
    const insurance = calculateMortgageInsurance(180000, 0.5);
    expect(insurance).toBeCloseTo(900, 2);
  });

  it("calculatePMI returns correct annual PMI", () => {
    // $250,000 loan, 0.5% rate
    const pmi = calculatePMI(250000, 0.5, true);
    expect(pmi).toBeCloseTo(1250, 2);
  });

  it("calculatePMI returns correct monthly PMI", () => {
    // $250,000 loan, 0.5% rate, monthly
    const pmi = calculatePMI(250000, 0.5, false);
    expect(pmi).toBeCloseTo(104.17, 2);
  });

  it("calculateMortgage handles zero interest", () => {
    const payment = calculateMortgage(100000, 0, 30);
    expect(payment).toBeCloseTo(100000 / (30 * 12), 2);
  });
});