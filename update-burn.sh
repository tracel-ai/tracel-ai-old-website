#!/bin/bash

echo "Cloning Burn"
git clone https://github.com/burn-rs/burn
# Checkout the version of the book
git checkout main

echo "Updating Burn Book"
cd burn/burn-book

cargo install mdbook 

rm -rf ../../public/book
mkdir -p ../../public/book

mdbook build
mv book ../../public

cd ../

echo "Updating Burn Docs"

rm -rf ../public/docs
mkdir -p ../public/docs

RUSTDOCFLAGS='--theme ../burn.css --default-theme burn' cargo doc --no-deps
mv target/doc/* ../public/docs/
cp ../burn.css ../public/docs/static.files/
