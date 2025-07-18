from pydantic import BaseModel

class Stats(BaseModel):
    total_users: int
    pending_users: int
    active_services: int