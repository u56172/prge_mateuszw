from fastapi import APIRouter
from sqlalchemy import create_engine, text

from app.settings import db_name, db_user, db_password

router_insert = APIRouter()

def connect_to_db(dv_name:str, db_user: str, dbpassword: str):
    return create_engine(
        f"postgresql://{db_name}:{db_password}@postgis:5432/{db_name}"
    )

@router_insert.get("/insert_user")
async def endpoint():

    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        params = {
            "name": "Asia",
            "posts": 4,
            "location": 'Warszawa'
        }

        sql_querry = text("""
        INSERT INTO users (name, posts, location)
        VALUES (:name, :posts, :location);
        """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_querry)
            conn.commit()
            print(result)
    except Exception as e:
        print(e)
        raise e


    return {"status":1},

