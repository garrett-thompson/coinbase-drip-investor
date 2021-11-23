import { getUserCurrency } from '../../utils/get-currency';
import { request } from '../../utils/request';
import { wait } from '../../utils/wait';
import { PaymentMethod } from '../get-primary-payment-method/types';
import { Transfer } from './types';

const amountToInvest = process.env.FUNDS_TO_DEPOSIT as string;
const currency = getUserCurrency();

export async function depositFunds(paymentMethod: PaymentMethod) {
  console.log(`┌ 💰 Starting deposit of ${amountToInvest}${currency}`);

  const { data: deposit } = await request({
    requestMethod: 'POST',
    requestPath: '/deposits/payment-method',
    body: {
      amount: amountToInvest,
      currency,
      payment_method_id: paymentMethod.id,
    },
  });

  await waitUntilTransferIsComplete(deposit.id);
}

async function waitUntilTransferIsComplete(transferId: string) {
  let complete: boolean = false;
  let waitPeriod: number = 500;

  while (complete === false) {
    console.log('│ ...waiting for deposit to complete');
    await wait(waitPeriod);

    const { data: transfer } = await request<Transfer>({
      requestMethod: 'GET',
      requestPath: `/transfers/${transferId}`,
    }).catch(() => {
      return { data: undefined };
    });

    if (transfer?.completed_at) {
      complete = true;
      console.log(`└ ✅ Finished deposit of ${amountToInvest}${currency}`);
    } else {
      waitPeriod = waitPeriod * 2;
    }
  }
}
