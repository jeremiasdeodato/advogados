using Microsoft.AspNetCore.Mvc;

namespace AdvogadosApi.API.Core
{
    public class ControllerBase<T> : ControllerBase
    {
        protected IActionResult ResponseGet(object? obj, bool errorWhenNull = true)
        {
            if (obj == null && errorWhenNull)
                return NotFound();

            if (obj == null && !errorWhenNull)
                return NoContent();

            return Ok(new SuccessResponse(obj));
        }

        protected IActionResult ResponsePost(string? mensagem, object? obj = null)
        {
            return Ok(new SuccessResponse(obj, mensagem));
        }
    }
}
