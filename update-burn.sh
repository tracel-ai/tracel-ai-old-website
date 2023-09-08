#!/bin/bash

echo "Cloning Burn"
git clone https://github.com/burn-rs/burn
git checkout dbc5f0a340136251170138f8825062b42ed2d096

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
