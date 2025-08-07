/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51RtEG40N4ISXPEp1UykG0x0aTICi29hEyaakAs30LYVSEi1f1L55FwWQzDCRsMVYSsaGWkQYRsqx24gLXIzqHXBv00zoSPytvo',
);

export const bookTour = async (tourID) => {
  try {
    // get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourID}`,
    );

    // create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
