from typing import Any, Dict

def create_response(
    data: Any = None,
    message: str = "Request successful.",
    response_code: int = 200,
) -> Dict[str, Any]:
    return {
        "response_code": response_code,
        "message": message,
        "data": data,
    }
