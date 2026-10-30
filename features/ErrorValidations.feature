Feature: Ecommerce validation

    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username           | password           |
            | anshikaw@yahoo.com | Learning@830$3mK3  |