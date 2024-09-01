namespace AdvogadosApi.API.Core
{
    public class SuccessResponse : Response
    {
        public string? SuccessMessage { get; set; }

        public SuccessResponse(object? data, string? message = null)
        {
            Data = data;
            SuccessMessage = message;
        }
    }
}
