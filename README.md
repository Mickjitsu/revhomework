# Revolut home test

## Introduction
Hey there and thanks for taking the time to review my assignment. For this assignment, I was tasked with installing a basic sandbox version of a Revolut payment field / top up to a test website in order to understand and show I understand the functionality.

Setting this up using expressJS and with both server side and client side functionality was a big learning curve that I thoroughly enjoyed.

This will only be a short readme explaining usage and some findings.

### How to use
The webpage has very basic functionality and little responsiveness, so it is only designed to be used on a medium/large device and not a mobile device.

Upon opening the page, you are greeted with a basic product checkout cart. Here once you click 'Go to checkout' , t the revolut orderID is created and returned in the console.log along with the response body (This is left there for transparency). You are then greeted with another modal that offers to proceed to payment. Upon clicking this, this then calls the revolut popup widget function and passes through the orderID that was generated, allowing for the payment to completed.

## Test cards
The test cards on the URL below all return the correct results, apart from the cards with decline reason 'customer_challenge_failed'. At first glance, these cards didn't return a failed response and return a response:
"
order
: 
{token: "dcaf8d0a-bcea-4827-b902-bd5458fe213a"}
payment_method
: 
{type: "card", brand: "visa", last_four: "4242"}
state
: 
"authorisation_passed"
token
: 
"9275c809-49fd-45f5-9886-76a7fda5e7a9"
"

Due to the time limit on the test and the current schedule, I was limited in investigating this further.

The final card for 'Order and payment stuck in processing state' is successful in the sense it does get stuck, and with fear of running over the time limit I did not investigate further to look for a setTimeout() option or something similar for this specific error.

At current standing, in order to generate a new orderID and use it correctly with the pop up field after a payment, the card needs to be refreshed.

## Folder structure
I moved the 'esm' folder from @revolut/checkout to the public folder of my app where my clientside JS file is hosted, this was due to issues with accessibility when creating the app. I ran into numerous issues with accessibility in this process which was the most time consuming part of the project. Please feel free to ask me for more details if interested.

## Access Keys
For security reasons the access keys used during testing have been removed from this repository and are held securely on Heroku. T]