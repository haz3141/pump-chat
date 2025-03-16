;; Define the fungible token
(define-fungible-token kult)

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_NO_TOKENS (err u101))

;; Data variables
(define-data-var total-supply uint u1000000000000) ;; 1M tokens with 6 decimals
(define-data-var treasury-balance uint u1000000000000)

;; Read-only functions
(define-read-only (get-balance (account principal))
  (ok (ft-get-balance kult account))
)

(define-read-only (get-treasury-balance)
  (ok (var-get treasury-balance))
)

(define-read-only (get-symbol)
  (ok "KULT")
)

(define-read-only (get-decimals)
  (ok u6)
)

;; Transfer function for users
(define-public (transfer (amount uint) (recipient principal))
  (begin
    (asserts! (> amount u0) ERR_NO_TOKENS)
    (asserts! (>= (ft-get-balance kult tx-sender) amount) ERR_NO_TOKENS)
    (ft-transfer? kult amount tx-sender recipient)
  )
)

;; Reward function - only owner can distribute from treasury
(define-public (reward-user (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_NOT_AUTHORIZED)
    (asserts! (> amount u0) ERR_NO_TOKENS)
    (asserts! (<= amount (var-get treasury-balance)) ERR_NO_TOKENS)
    (asserts! (is-standard recipient) ERR_NOT_AUTHORIZED) ;; Your fix
    (var-set treasury-balance (- (var-get treasury-balance) amount))
    (ft-mint? kult amount recipient)
  )
)

;; Initial setup
(begin
  (unwrap-panic (ft-mint? kult (var-get total-supply) CONTRACT_OWNER))
  (var-set treasury-balance (var-get total-supply))
)