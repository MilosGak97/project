export enum SubscriptionRenewalStatus{
    NOT_ELIGIBLE = 'not_eligible', // Renewal not allowed (e.g., expired subscription)
    ELIGIBLE_FOR_DISCOUNT = 'eligible_for_discount', // Eligible for discount (60-30 days before expiration)
    ELIGIBLE_FOR_REGULAR_PRICE = 'eligible_for_regular_price', // Eligible for renewal at regular price (less than 30 days before expiration)
    RENEWAL_SCHEDULED = 'renewal_scheduled', // Renewal is scheduled for a future date
    RENEWAL_PENDING = 'renewal_pending', // Renewal date is here and is scheduled, but payment is not made yet
    RENEWAL_COMPLETED = 'renewal_completed', // Renewal was successful
    RENEWAL_CANCELED = 'renewal_canceled' // Renewal was canceled by the user or not scheduled/initiated

}