export function calculateAvailableSeats(seatPlan) {
  let totalAvailableSeat = 0;
  for (let [row, seatList] of Object.entries(seatPlan)) {
    for (let seat of seatList) {
      if (seat === 1) totalAvailableSeat = totalAvailableSeat + 1;
    }
  }
  return totalAvailableSeat;
}
