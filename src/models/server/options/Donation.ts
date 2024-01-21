class Donation {
  private donor: string;
  private amount: number;

  constructor(donor: string, amount: number) {
    this.donor = donor;
    this.amount = amount;
  }

  public getDonor(): string {
    return this.donor;
  }

  public getAmount(): number {
    return this.amount;
  }
}

export default Donation;
