#!/bin/bash

echo "Cloning Burn"
git clone https://github.com/tracel-ai/burn
cd burn
git pull
git checkout v0.12.1

echo "Updating Burn Book"
cd burn-book

cargo install mdbook 

rm -rf ../../public/book
mkdir -p ../../public/book

mdbook build
mv book ../../public

cd ../

echo "Updating Burn Docs"

rm -rf ../public/docs
mkdir -p ../public/docs

# We only build the documentation for the burn crate, which redistributes the other crates.
# Otherwise we have duplicated documentation.
RUSTDOCFLAGS='--theme ../burn.css --default-theme burn' cargo doc --package burn --no-deps --no-default-features --features doc --release
mv target/doc/* ../public/docs/
cp ../burn.css ../public/docs/static.files/
