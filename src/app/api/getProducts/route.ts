import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : '')
  const products = await stripe.products.list()

  return NextResponse.json(products)
}
