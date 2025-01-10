import os

def clean_zone_identifier(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if ":Zone.Identifier" in file:
                path = os.path.join(root, file)
                try:
                    os.remove(path)
                    print(f"Deleted: {path}")
                except Exception as e:
                    print(f"Failed to delete {path}: {e}")

# Set your directory path
clean_zone_identifier("/home/azeroji/web/DPI/BackEnd/main")
