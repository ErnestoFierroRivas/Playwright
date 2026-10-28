Feature: Ecommerce validation

    Scenario: Placing the Order
        Given a login to Ecommerce application with "anshikaw@yahoo.com" and "Learning@830$3mK3"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order in present in the OrderHistory