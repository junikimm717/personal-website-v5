{
  description = "Juni's Personal Website";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-24.11";
    flake-utils = {
      url = "github:numtide/flake-utils";
    };
  };

  outputs = { self, nixpkgs, flake-utils }:
    with flake-utils.lib;
    eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        version = "0.1.0";
        name = "Juni's Personal Website";
      in {

        devShell = pkgs.mkShell { buildInputs = with pkgs; [ nodejs ]; };

        defaultPackage = pkgs.stdenv.mkDerivation { 
          inherit name version;
        };

        formatter = nixpkgs.legacyPackages."${system}".nixfmt;

      });
}
