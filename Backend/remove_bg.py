import sys
from rembg import remove
from PIL import Image

def main():
    input_path = sys.argv[1]
    output_path = sys.argv[2]

    inp = Image.open(input_path)
    out = remove(inp)
    out.save(output_path)

if __name__ == "__main__":
    main()