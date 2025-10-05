﻿using System.Text.Json.Serialization;

namespace DatingAPI.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }

        // Navigation property
        public string MemberId { get; set; } = null!;

        [JsonIgnore]
        public Member AppUser { get; set; } = null!;
    }
}
