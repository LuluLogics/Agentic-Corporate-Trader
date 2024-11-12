import yfinance as yf
import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
import time
import logging
import google.api_core.exceptions

# Set up logging
logging.basicConfig(level=logging.INFO)

# Hardcoded Firebase credentials
firebase_credentials = {
  "type": "service_account",
  "project_id": "act-database-508c1",
  "private_key_id": "820485e156bcafe49a868b9f2a2ffb4b9839e7df",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCev1MltlbUwDgq\nJd22lOj52TT/PFVMxTy8OtbPohMkSVv301p+uEG8WF9PtUo0RZuJkb7OZTjspvn0\nJGgHRL4i9M+UArAnuxXf8rsLxCqwsQDpFJoYx11KRnKoY/hHYUY8dxRmOq7wk8rL\nCiK4jsbNQC12ITY5mkt/Xf2hVD6FTK1Dw8z18Wgnwk0p1Dv9iKpYXlqMCDqmm2T8\n8vM1VqMHSudsMJA9VvIMAa5geAR9MEhR0R5PTt9sXyapZp5AQuVXuKRrIrv8b7ZQ\nJHtf3x1LpEF+wYjgqu7BAYDX+Zr1j4fND6pgiWosNYY+ob5Gj1bkdrZrLU/lwJi1\nsiGXxrLDAgMBAAECggEAKCUvREq747qmmXYQ/zLiRgj5f5CE69C3XsysdT7CA3uv\nz9j5ujEjoptgoxowJU7zGhOrAqwTfLlvXZ/1VN08DkAF3KLfZHTJ/+P1DHEz8JIa\nrlcA70I/o+Bz74S0jWyapADjPkUZ54ogjz9Fb5Hf0ZkoxgZ5HZEZBaFB2lIhK3lF\n0rTNC9NU0lgKqdttAdNaXuBOAvgT9+W8RUZUFcHElznxfGSIvjfWQzz6KoxbHcGN\nHBaKREf/npnGM4dLNC2n1drZD/9vJ8MN1XIk2g0jYvftVUoLTdwN91C0oIrnBOHb\nQsL/HoHOBa1gGXN2d56pVxYI/MqjzpGhVaKV9719gQKBgQDaHGInYO2NBqbO6YO1\nG3JmCw/U77anwB3TtZ78kpFhK3/9tCrg9SFXFENvyv4oRtvFsQqZGwjS3bUpsWQv\nB9w+wXxDIi+Mu/LajIrOs05eV3m6o/Fks3MnDIvF8y8o7Fd5aBUH7r+oO/9/PX7Y\nQkD0Tgh8ZLxQPnajmlKnEobwgQKBgQC6UvwLaQCp/eZJwiW+G5CjL3I8UEBx3mS6\nKD+XhBK9DQztZ8M/dFCw2KlQ7wqTEHfyPb0pfokaaT8z8gQzEKD51bO6PDD5rlLN\n5qX9BeBXhf1++0KPBT6z55uZACdO1FMrijVfAXSrwfVjSpMz0Zv6/i2JRnrgBCFP\n16ZSWOVBQwKBgQCwL/Vp8fZy0Ui2JBPsnHtQyubDD9DwuVRezHvdc1hUshr2CjAJ\nAHsqKIhBKi0cxACMNXNmMlxyWf4Z694Nz7+uQgXrBRZ8DOckfBs01cscknUWu5An\n1H3UsWHHSaZy3FfdDqLOgaH4eF7vnfF1KC/oKZDZS1aDS7Hyfpr9sw2mAQKBgHmn\nURWKG3riYgfqkYYMrWU+x1GF/G3cjNvXB55AB5QT/0rKovq9USoGbJaBXOAksowh\nr252RcJO0YtzCzbkNpao505Dmp6LKVlyrRIFUjMTMy5Dk3OaMxR3tmoxZXjcvOkC\ntlIvuyOh4jxQJsiApV09tDGbKQM27yEYZmoBzL3NAoGAT+0MKvGI7jRxOC9DJNrJ\n+ZKaglXFCjmrGdnVBipeQ0f69vbrnsmmjRubK2RVHVJAqH0BPc+6k7tcGYdP2rNo\nLPlsgI78FtlBPkgEiyCRbhEvJ67V2orXdi6pIPYx1TZNK4BEZ0AouQddFXmM8Cow\nW9UESQP5uuGCsJDpy6ENoIU=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-gu329@act-database-508c1.iam.gserviceaccount.com",
  "client_id": "112063986922693361475",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gu329%40act-database-508c1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

# Initialize Firebase Admin SDK
try:
    cred = credentials.Certificate(firebase_credentials)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    logging.info("Firebase initialized successfully")
except Exception as e:
    logging.error(f"Error initializing Firebase: {e}")
    db = None  # Set db to None to avoid NameError later

def fetch_historical_data(stock):
    periods = ["5y", "1y", "max"]
    for period in periods:
        try:
            logging.info(f"Fetching data for {stock.ticker} with period {period}")
            historical_data = stock.history(period=period, interval="1d")
            if not historical_data.empty:
                return historical_data.to_dict(orient='index')
            else:
                logging.info(f"{stock.ticker}: No data for {period}. Trying next period.")
        except Exception as e:
            logging.error(f"Error fetching historical data for {stock.ticker} with period {period}: {e}")
    logging.warning(f"{stock.ticker}: No historical data available for any period.")
    return None


def populate_stocks(symbols, batch_size=5, initial_delay=300, max_retries=5):
    if not db:
        logging.error("Database client is not initialized. Exiting function.")
        return
    
    for index, symbol in enumerate(symbols):
        stock = yf.Ticker(symbol)

        # Check if the stock already exists in the database
        doc_ref = db.collection('stocks').document(symbol)
        doc_snapshot = doc_ref.get()
        if doc_snapshot.exists:
            logging.info(f"Stock {symbol} already exists in the database. Skipping.")
            continue

        retries = 0
        while retries < max_retries:
            try:
                info = stock.info
                if not info:
                    logging.warning(f"Error: Could not retrieve data for {symbol}")
                    break

                name = info.get('shortName', 'N/A')
                sector = info.get('sector', 'N/A')
                market_cap = info.get('marketCap', 0)
                price = info.get('regularMarketPrice', 0)

                # Fetch historical data
                historical_data_dict = fetch_historical_data(stock)
                if not historical_data_dict:
                    break

                logging.info(f"Writing data for {symbol} to Firestore")

                # Set basic stock data
                doc_ref.set({
                    'symbol': symbol,
                    'name': name,
                    'sector': sector,
                    'marketCap': market_cap,
                    'price': price,
                    'lastUpdated': firestore.SERVER_TIMESTAMP
                })

                # Aggregate historical data
                aggregated_data = {}
                for date, data in historical_data_dict.items():
                    aggregated_data[date] = {
                        'open': data['Open'],
                        'close': data['Close'],
                        'high': data['High'],
                        'low': data['Low'],
                        'volume': data['Volume']
                    }

                # Write the aggregated data as a single document
                doc_ref.collection('historical').document('aggregated_data').set({
                    'data': aggregated_data
                })

                logging.info(f"Data for {symbol} written successfully")
                break

            except google.api_core.exceptions.ResourceExhausted as e:
                retries += 1
                wait_time = initial_delay * (2 ** retries)
                logging.warning(f"Quota exceeded while adding {symbol}. Retrying in {wait_time} seconds (Attempt {retries}/{max_retries}).")
                time.sleep(wait_time)
            except Exception as e:
                logging.error(f"Error adding {symbol}: {e}")
                break
        else:
            logging.error(f"Exceeded maximum retries for {symbol}. Skipping to next stock.")

        # Batch delay only if the batch size limit is reached
        if (index + 1) % batch_size == 0:
            logging.info(f"Processed {batch_size} stocks. Sleeping for {initial_delay} seconds to avoid rate limits...")
            time.sleep(initial_delay)


if __name__ == "__main__":
    def get_nasdaq100_symbols():
        try:
            url = 'https://en.wikipedia.org/wiki/NASDAQ-100'
            tables = pd.read_html(url, header=0)
            table = tables[4]  # This is where the Nasdaq-100 table is located
            symbols = table['Symbol'].tolist()
            logging.info(f"Fetched {len(symbols)} Nasdaq-100 symbols.")
            return symbols
        except Exception as e:
            logging.error(f"Error fetching Nasdaq-100 symbols: {e}")
            return []

    stock_symbols = get_nasdaq100_symbols()
    if stock_symbols:
        populate_stocks(stock_symbols)
    else:
        logging.error("No stock symbols available.")
