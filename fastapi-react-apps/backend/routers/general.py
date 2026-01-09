from fastapi import APIRouter

router = APIRouter(tags=["general"])


@router.get("/envlist")
def get_envlist():
    return {"DEV": "", "QA": "", "PRD": ""}


@router.get("/deployment_type")
def get_deployment_type():
    return {
        "deployment_env": "test",
        "title": {
            "test": "OCP Management Portal (Test)",
            "pilot": "OCP Management Portal (Live)",
            "management": "OCP Management Portal (Management)",
            "live": "OCP Management Portal",
        },
        "headerColor": {
            "test": "red",
            "pilot": "#384454",
            "management": "orange",
            "live": "#384454",
        },
    }


@router.get("/current-user")
def get_current_user():
    return {"user": "user1"}
