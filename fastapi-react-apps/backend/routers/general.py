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
            "test": "OCP Provisioning Portal (Test)",
            "staging": "OCP Provisioning Portal (Staging)",
            "live": "OCP Provisioning Portal",
        },
        "headerColor": {
            "test": "red",
            "staging": "orange",
            "live": "#384454",
        },
    }


@router.get("/current-user")
def get_current_user():
    return {"user": "user1"}
