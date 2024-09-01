namespace AdvogadosApi.Domain.Core
{
    public class ErrorValidationException : Exception
    {
        public ErrorValidationException(string? message) : base(message)
        {
        }
    }
}

