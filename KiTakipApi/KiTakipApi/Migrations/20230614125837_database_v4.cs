using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KiTakipApi.Migrations
{
    /// <inheritdoc />
    public partial class database_v4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailID",
                table: "AdminUsers");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "AdminUsers",
                newName: "Email");

            migrationBuilder.AddColumn<byte[]>(
                name: "PassHash",
                table: "AdminUsers",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "PassSalt",
                table: "AdminUsers",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassHash",
                table: "AdminUsers");

            migrationBuilder.DropColumn(
                name: "PassSalt",
                table: "AdminUsers");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "AdminUsers",
                newName: "Password");

            migrationBuilder.AddColumn<string>(
                name: "EmailID",
                table: "AdminUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
