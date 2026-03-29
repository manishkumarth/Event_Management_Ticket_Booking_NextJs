export async function POST(req) {
    try {
      const orderId = "order_" + Date.now();
  
      const response = await fetch(process.env.CashFreeOrderAPI, {
        method: "POST",
        headers: {
            'x-api-version': '2023-08-01',
            'x-client-id': process.env.CashFreeClientId,
            'x-client-secret': process.env.CashFreeClientSecret,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: 100,
          order_currency: "INR",
          customer_details: {
            customer_id: "cust_" + Date.now(),
            customer_email: "test@gmail.com",
            customer_phone: "9999999999"
          }
        })
      });
  
      const data = await response.json();
  
      return Response.json(data);
  
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }