from sqlalchemy import Boolean, Column, Integer, String, Enum
from database import Base
import enum

class UserRole(str, enum.Enum):
    faculty = "faculty"
    postdoc = "postdoc"
    phd = "phd"
    ms = "ms"
    undergrad = "undergrad"
    industry = "industry"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(String, default=UserRole.undergrad)
    is_active = Column(Boolean, default=True)
