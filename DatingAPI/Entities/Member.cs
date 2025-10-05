using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DatingAPI.Entities
{
    public class Member
    {
        public string Id { get; set; } = null!;
        public DateOnly DateOfBirth { get; set; }
        public string? ImageUrl { get; set; }
        public required string DisplayName { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; } = null!;
        public string Description { get; set; } = null!;
        public required string City { get; set; }
        public required string Country { get; set; }

        // Navigation property
        [JsonIgnore]
        public ICollection<Photo> Photos { get; set; } = [];

        // Navigation property to AppUser   
         [JsonIgnore]
        [ForeignKey(nameof(Id))]
        public AppUser? AppUser { get; set; }
    }

}
