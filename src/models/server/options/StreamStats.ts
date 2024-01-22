import Donation from "./Donation";

class StreamStats {
  private donations: Donation[] = [];

  public addDonation(donation: Donation): void {
    this.donations.push(donation);
  }

  public getTotalDonations(): number {
    return this.donations.reduce(
      (total, donation) => total + donation.getAmount(),
      0
    );
  }

  public getDonationList(): Donation[] {
    return [...this.donations];
  }
}

export default StreamStats;
